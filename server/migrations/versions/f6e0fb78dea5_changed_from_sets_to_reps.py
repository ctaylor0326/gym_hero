"""changed-from-sets-to-reps

Revision ID: f6e0fb78dea5
Revises: 20dc06fd4728
Create Date: 2023-06-28 11:44:41.260186

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f6e0fb78dea5'
down_revision = '20dc06fd4728'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('loggedexercisesets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('exercise_id', sa.String(length=4), nullable=True),
    sa.Column('exercise_name', sa.String(length=255), nullable=True),
    sa.Column('duration', sa.Integer(), nullable=True),
    sa.Column('reps_completed', sa.Integer(), nullable=True),
    sa.Column('weight_used', sa.Integer(), nullable=True),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_loggedexercisesets_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('loggedexercises')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('loggedexercises',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('exercise_id', sa.VARCHAR(length=4), nullable=True),
    sa.Column('exercise_name', sa.VARCHAR(length=255), nullable=True),
    sa.Column('duration', sa.INTEGER(), nullable=True),
    sa.Column('sets_completed', sa.INTEGER(), nullable=True),
    sa.Column('weight_used', sa.INTEGER(), nullable=True),
    sa.Column('notes', sa.TEXT(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_loggedexercises_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('loggedexercisesets')
    # ### end Alembic commands ###