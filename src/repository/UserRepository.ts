/* eslint-disable @typescript-eslint/require-await */
import { backendServiceInstance } from "src/api/BackendServiceImpl"
import { User } from "src/model/User"

export interface UserRepository {
  getAll(): Promise<User[]>
  getSelf(): Promise<User>
  deleteSelf(): Promise<void>
}

class UserRepositoryImpl implements UserRepository {
  getAll = async (): Promise<User[]> => backendServiceInstance.getUserList()
  getSelf = async (): Promise<User> => backendServiceInstance.getUserSelf()
  deleteSelf = async (): Promise<void> => backendServiceInstance.deleteUserSelf()
}

export const userRepositoryInstance: UserRepository = new UserRepositoryImpl()
