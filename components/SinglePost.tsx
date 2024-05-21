import { Post } from '@/types'
import Image from 'next/image'

const SinglePost = ({ postData }: { postData: Post }) => {
  return (
    <div className='w-[20rem] border rounded-lg m-5 hover:shadow-lg hover:cursor-pointer transition-all text-wrap pb-3'>
        <Image className='w-full rounded-lg' width={30} height={20} src={postData.imageUrl} alt={"post"} />
        <h3 className='text-xl font-semibold p-3'>{postData.title}</h3>
        <p className='px-3 w-[20rem] text-wrap font-light'>{postData.message}</p>
    </div>
  )
}

export default SinglePost