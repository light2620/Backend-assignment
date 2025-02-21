import React from 'react'
import { useDispatch } from 'react-redux'
import { setName } from '../redux/user.slice';

const UserDetailModel = ({ email, handleLogout }) => {


  return (
    <div className="absolute w-[300px]  rounded bg-white top-12 p-2 flex flex-col gap-5 shadow-2xl">
      <p className="font-bold text-lg">Email: <span className="font-light">{email}</span></p>
      <button onClick={handleLogout} className="bg-emerald-500 text-white font-semibold self-center p-2 py-1 pt-0 rounded hover:shadow cursor-pointer ">Logout</button>
    </div>
  )
}

export default UserDetailModel
