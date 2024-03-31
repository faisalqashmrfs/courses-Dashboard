import React from 'react'
import SpecialRow from './SpecialRow/SpecialRow'

export default function SpeciallTable() {
  return (
    <section className='Vidio-Table-section'>
            <ul className='main'>
                <li>الإعدادات</li>
                <li>صورة الاختصاص</li>
                <li>رقم الدفعة</li>
                <li>اسم الاختصاص</li>
            </ul>
            <SpecialRow />
            <SpecialRow />
            <SpecialRow />
            <SpecialRow />
            <SpecialRow />
            <SpecialRow />
            <SpecialRow />
            <SpecialRow />
            <SpecialRow />

        </section>
  )
}
