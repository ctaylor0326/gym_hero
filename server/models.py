from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.associationproxy import association_proxy
from werkzeug.security import generate_password_hash, check_password_hash


from config import db

# Models go here!


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(100), nullable=False)
    workouts = association_proxy('dailyschedules', 'workout')
    dailyschedules = db.relationship('DailySchedule', backref='user')

    serialize_rules = ('-dailyschedules.user', 'workouts',
                       '-password_hash')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key=True)
    workout_name = db.Column(db.String)
    exercises = db.Column(db.String)
    creator = db.Column(db.Integer, nullable=False)
    dailyschedules = db.relationship(
        'DailySchedule', backref='workout', cascade="all, delete-orphan")
    users = association_proxy('dailyschedules', 'user')
    serialize_rules = ('-dailyschedules',)

    def __repr__(self):
        return f'<Workout {self.workout_name}: Created by {self.creator}>'


class DailySchedule(db.Model, SerializerMixin):
    __tablename__ = 'dailyschedules'

    id = db.Column(db.Integer, primary_key=True)
    weekday = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
