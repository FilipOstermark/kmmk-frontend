import { useEffect, useState } from "react"
import { User } from "src/model/User"
import { userRepositoryInstance } from "src/repository/UserRepository"

export const AccountSettings: () => JSX.Element = () => {
  
  const [user, setUser] = useState<User>({
    id: -1,
    name: "?",
    email: "?"
  })

  useEffect(() => {
    userRepositoryInstance.getSelf().then(me => {
      setUser(me)
    }).catch(err => {
      console.error("Failed to fetch user information", err)
    })
  }, [])

  return (<div>
    <h1>Användarkonto</h1>
    <h3>{user.name}</h3>
    <h3>{user.email}</h3>
    <div>
      <h2>Danger zone</h2>
      <button>Ta bort användardata</button>
    </div>
  </div>)
}
