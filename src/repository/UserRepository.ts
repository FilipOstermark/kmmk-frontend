/* eslint-disable @typescript-eslint/require-await */
import { backendServiceInstance } from "src/api/BackendServiceImpl"
import { User } from "src/model/User"

export interface UserRepository {
  getAll(): Promise<User[]>
  getSelf(): Promise<User>
}

class UserRepositoryImpl implements UserRepository {
  getAll = async (): Promise<User[]> => backendServiceInstance.getUserList()
  getSelf = async (): Promise<User> => backendServiceInstance.getUserSelf()
}

export const userRepositoryInstance: UserRepository = new UserRepositoryImpl()
