import VideoRow from './VideoRow/VideoRow'
import './VideosTable.css'

export default function VideosTable() {
    return (
        <section className='Vidio-Table-section'>
            <ul className='main'>
                <li>الإعدادات</li>
                <li>رقم الدفعة</li>
                <li>الاختصاص</li>
                <li>رابط الجلسة</li>
                <li>تاريخ الجلسة</li>
                <li>رقم الجلسة</li>
                <li>عنوان الجلسة</li>
            </ul>
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
            <VideoRow />
        </section>
    )
}
