import React from 'react'
import UserRow from './UserRow/UserRow'

export default function UserTable() {
  return (
    <section className='Vidio-Table-section'>
            <ul className='main'>
                <li>الإعدادات</li>
                <li>الحالة</li>
                <li>الاختصاص</li>
                <li>رقم الدفعة</li>
                <li>كلمة السر</li>
                <li>البريد الالكتروني</li>
                <li>اسم المتدرب</li>
            </ul>
            <UserRow />
            <UserRow />
            <UserRow />
            <UserRow />
            <UserRow />
            <UserRow />
            <UserRow />
            <UserRow />
            <UserRow />
            <UserRow />
            <UserRow />
            <UserRow />
        </section>
  )
}
