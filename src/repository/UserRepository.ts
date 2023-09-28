/* eslint-disable @typescript-eslint/require-await */
import { User } from "src/model/User"

export interface UserRepository {
  getAll(): Promise<User[]>
  add(user: User): Promise<void>
}

class UserRepositoryImpl implements UserRepository {
  private users = [
    {
      name: "viktor",
      email: "viktor@placeholder.com"
    },
    {
      name: "elias",
      email: "elias@placeholder.com"
    },
    {
      name: "filip",
      email: "filip@placeholder.com"
    }
  ]

  getAll = async (): Promise<User[]> => this.users

  add = async (user: User): Promise<void> => { 
    this.users.push(user) 
  }
}

export const userRepositoryInstance: UserRepository = new UserRepositoryImpl()
