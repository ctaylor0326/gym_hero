#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, jsonify, request, make_response, abort, session, redirect, url_for
from flask_restful import Resource
from flask_sqlalchemy import SQLAlchemy


# Local imports
from config import app, db, api
from models import User, Workout, DailySchedule


class NewUser(Resource):
    def post(self):
        form = request.json
        new_user = User(
            first_name=form.get('first_name'),
            last_name=form.get('last_name'),
            email=form.get('email'),
        )
        new_user.set_password(form.get('password'))
        try:
            db.session.add(new_user)
            db.session.commit()
            user_dict = new_user.to_dict()
            return user_dict, 201
        except Exception as e:
            print(e)
            return abort(500, {"error": "Internal Server Error"})


api.add_resource(NewUser, '/register')


class LoginResource(Resource):
    def post(self):
        data = request.json
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            # Password is correct, proceed with authentication and session handling
            session['user_id'] = user.id
            response_data = {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email
            }
            response = make_response(jsonify(response_data))
            return response
        else:
            # Invalid credentials
            response_data = {'message': 'Invalid email or password'}
            response = make_response(jsonify(response_data))
            response.status_code = 401
            return response


api.add_resource(LoginResource, '/login')


class LogoutResource(Resource):
    def get(self):
        # Clear session variables
        session.clear()

        return {'message': 'Logged out successfully'}


api.add_resource(LogoutResource, '/logout')


class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401


api.add_resource(CheckSession, '/check_session')


class Workouts(Resource):
    def get(self):
        creator = request.args.get('creator')

        if creator:
            workouts = Workout.query.filter_by(creator=creator).all()
        else:
            workouts = Workout.query.all()

        workout_list = [workout.to_dict() for workout in workouts]
        return workout_list

    def post(self):
        form = request.json
        new_workout = Workout(
            workout_name=form.get('workout_name'),
            exercises=form.get('exercises'),
            creator=form.get('creator')
        )
        try:
            db.session.add(new_workout)
            db.session.commit()
            workout_dict = new_workout.to_dict()
            return workout_dict, 201
        except Exception as e:
            print(e)
            return abort(500, {"error": "Internal Server Error"})


api.add_resource(Workouts, '/workouts')


class WorkoutsById(Resource):
    def get(self, id):
        workout = Workout.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(workout), 200)


api.add_resource(WorkoutsById, '/workouts/<int:id>')


class DailySchedules(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id is None:
            return {
                'error': 'User ID not found in session'
            }, 400

        try:
            daily_schedules = DailySchedule.query.filter_by(
                user_id=user_id).all()

            selected_workouts = []
            for schedule in daily_schedules:
                workout = Workout.query.get(schedule.workout_id)
                if workout:
                    selected_workouts.append({
                        'weekday': schedule.weekday,
                        'workout_name': workout.workout_name,
                        'workout_id': workout.id
                    })

            return selected_workouts, 200

        except Exception as e:
            print(e)
            return {
                'error': 'Internal Server Error'
            }, 500

    def post(self):
        selection = request.json
        user_id = session.get('user_id')
        if not user_id:
            return {'error': 'User ID not found in session'}, 400

        weekday = selection.get('weekday')
        workout_id = selection.get('workout_id')

        try:
            existing_schedule = DailySchedule.query.filter_by(
                user_id=user_id, weekday=weekday).first()

            if existing_schedule:
                return {'error': f'Daily schedule for "{weekday}" already exists'}, 400

            new_schedule = DailySchedule(
                user_id=user_id,
                workout_id=workout_id,
                weekday=weekday
            )
            db.session.add(new_schedule)
            db.session.commit()

            return {'message': f'Daily schedule for "{weekday}" created successfully'}

        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500

    def patch(self):
        user_id = session.get('user_id')
        if user_id is None:
            return {
                'error': 'User ID not found in session'
            }, 400

        data = request.get_json()
        weekday = data.get('weekday')
        workout_id = data.get('workout_id')

        try:
            daily_schedule = DailySchedule.query.filter_by(
                user_id=user_id, weekday=weekday).first()

            if daily_schedule:
                daily_schedule.workout_id = workout_id
                db.session.commit()

                return {
                    'message': f'Daily schedule for "{weekday}" updated successfully'
                }, 200
            else:
                return {
                    'error': f'Daily schedule for "{weekday}" not found'
                }, 404

        except Exception as e:
            print(e)
            return {
                'error': 'Internal Server Error'
            }, 500

    def delete(self):
        user_id = session.get('user_id')
        if user_id is None:
            return {
                'error': 'User ID not found in session'
            }, 400

        try:
            data = request.get_json()
            weekday = data.get('weekday')

            DailySchedule.query.filter_by(
                user_id=user_id, weekday=weekday).delete()

            db.session.commit()

            return {
                'message': f'Daily schedule for "{weekday}" deleted successfully'
            }, 200

        except Exception as e:
            print(e)
            return {
                'error': 'Internal Server Error'
            }, 500


api.add_resource(DailySchedules, '/dailyschedules', '/selectedworkouts')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
