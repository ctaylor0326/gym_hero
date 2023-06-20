#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, jsonify, request, make_response, abort, session, redirect, url_for
from flask_restful import Resource
from flask_sqlalchemy import SQLAlchemy


# Local imports
from config import app, db, api
from models import User, Workout


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


class NewWorkout(Resource):
    def post(self):
        form = request.json
        new_workout = Workout(
            workout_name=form.get('workout_name'),
            exercises=form.get('exercises')
        )
        try:
            db.session.add(new_workout)
            db.session.commit()
            workout_dict = new_workout.to_dict()
            return workout_dict, 201
        except Exception as e:
            print(e)
            return abort(500, {"error": "Internal Server Error"})


api.add_resource(NewWorkout, '/workout')


class LoginResource(Resource):
    def get(self):
        return {'message': "Hello World"}

    def post(self):
        data = request.json
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            # Password is correct, proceed with authentication and session handling
            session['user_id'] = user.id
            # ...

            return user.to_dict()
        else:
            # Invalid credentials
            return {'message': 'Invalid email or password'}


api.add_resource(LoginResource, '/login')


class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401


api.add_resource(CheckSession, '/check_session')


class UserByID(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        if user:
            user_data = user.to_dict()
            return make_response(jsonify(user_data), 200)
        else:
            return make_response(jsonify({'message': 'User not found'}), 404)

    def patch(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        if user:
            data = request.get_json()
            for attr in data:
                setattr(user, attr, data[attr])
            db.session.add(user)
            db.session.commit()
            user_dict = user.to_dict()
            return make_response(jsonify(user_dict), 200)
        else:
            return make_response(jsonify({'message': 'User not found'}), 404)

    def delete(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response('', 204)
        else:
            return make_response(jsonify({'message': 'User not found'}), 404)


if __name__ == '__main__':
    app.run(port=5555, debug=True)
