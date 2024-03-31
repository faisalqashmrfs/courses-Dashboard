import './UserRow.css'

export default function UserRow() {
  return (
    <>
        <ul className='VideoROW'>
                <li className="edit-del">
                    <button>حذف</button>
                    <button>تعديل</button>
                </li>
                <li className="item">متدرب</li>
                <li className="item">تصميم</li>
                <li className="item">6</li>
                <li className="item">namenamefocalx</li>
                <li className="item">email@gamail.com</li>
                <li className="item-With-Check" >اسم المتدرب</li>
            </ul>
    </>
  )
}
