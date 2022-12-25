import { NextPage } from "next"
import Link from "next/link"
import { type } from "os"
import React, { useDeferredValue, useState } from "react"

const Contact: NextPage = () => {
  type TUser = {
    name: string,
    email: string,
    phone: number,
    address: string,
    message: string
  }

  const [user, setUser] = useState<TUser>({
    name: "",
    email: "",
    phone: 0,
    address: "",
    message: ""
  })
  // console.log(user.address, user.phone)

  type TEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

  const getUserData = (event: TEvent) => {
    const name = event.target.name
    const value = event.target.value
    // console.log(typeof (event.target))
    // console.log('event.target.name = ', name)
    // console.log('event.target.value', value)

    setUser({ ...user, [name]: value })
  }

  const postData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const responce = await fetch(
      'https://next-js-with-firebase-58373-default-rtdb.firebaseio.com/next-js-with-firebase.json',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/jason' },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          message: user.message
        })

      })
  }

  return (
    <>
      <div className="w-3/6 mx-auto bg-slate-400 h-100">
        <h3>{}</h3>
        <div>
          <form method="POST">
            <div className="w-40 my-3 ml-3">
              <span>Name :</span>
              <input type="text" name="name" value={user.name} onChange={getUserData} placeholder="Enter Your Nmae" required />
            </div>
            <div className="w-40 my-3 ml-3">
              <span>E-mail :</span>
              <input type="text" name="email" value={user.email} onChange={getUserData} placeholder="Enter Your E-mail" required />
            </div>
            <div className="w-40 my-3 ml-3">
              <span>Phone :</span>
              <input type="text" name="phone" value={user.phone} onChange={getUserData} placeholder="Enter Your Phone" required />
            </div>
            <div className="w-40 my-3 ml-3">
              <span>Address :</span>
              <input type="text" name="address" value={user.address} onChange={getUserData} placeholder="Enter Your Address" required />
            </div>
            <div className="w-40 my-3 ml-3">
              <span>Message :</span>
              <textarea name="message" value={user.message} onChange={getUserData} placeholder="Message" required />
            </div>

            <div className="ml-3">
              <button onClick={postData}>Submit</button>
            </div>

          </form>

        </div>
      </div>
    </>
  )
}

export default Contact