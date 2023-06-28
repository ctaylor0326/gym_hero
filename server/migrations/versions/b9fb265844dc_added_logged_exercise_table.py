"""added-Logged-Exercise-Table

Revision ID: b9fb265844dc
Revises: fbb6af9784a7
Create Date: 2023-06-28 11:22:06.694510

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b9fb265844dc'
down_revision = 'fbb6af9784a7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('completedworkouts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('exercise_id', sa.String(length=4), nullable=True),
    sa.Column('exercise_name', sa.String(length=255), nullable=True),
    sa.Column('duration', sa.Integer(), nullable=True),
    sa.Column('sets_completed', sa.Integer(), nullable=True),
    sa.Column('weight_used', sa.Integer(), nullable=True),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_completedworkouts_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('completedworkouts')
    # ### end Alembic commands ###
