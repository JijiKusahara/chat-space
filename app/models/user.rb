class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true, uniqueness: true
  #cariduramu 4324 de kaita. 4266 dehanakunatteta
  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages
end
