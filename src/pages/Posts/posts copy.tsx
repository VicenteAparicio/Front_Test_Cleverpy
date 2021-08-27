import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IPage from '../../interfaces/page';
import logging from '../../config/logging';

const PostsPage: React.FunctionComponent<IPage> = props => {

    interface IPost {
        id: number,
        userId: number,
        title: string,
        body: string
    }

    // HOOK TO RECEIVE POSTS FROM AXIOS
    const [post, setPost] = useState<IPost[]|[]>([]);

    // HOOK TO FILTER POSTS FROM THE FIRST HOOK
    const [filtPost, setFiltPost] = useState<IPost[]|[]>([]);

    // HOOK TO DELIVER
    const [partition, setPartition] = useState<IPost[]|[]>([]);
    const [work, setWork] = useState<IPost[]|[]>([]);
    
    useEffect(() => {
        logging.info(`Loading ${props.name}`);  
    }, [props.name])

    useEffect(()=>{
        fetchPosts();
        workPosts();
    },[])

    // SET POSTS ON ORIGINAL HOOK
    const fetchPosts = async () => {
        const res = await getPosts()
        setPost(res);
    }

    // SET POSTS ON FILTER HOOK
    const filterCards = () => {
        setFiltPost(post);
    }
    
    // SET POSTS FROM FILTERED
    const workPosts = () => {
        setWork(filtPost);
    }

    // DELETE POST
    const deletePost = (arg:any) => {
        
        setFiltPost(
            filtPost.filter((item)=>(item?.id !== arg))
        )
        setPartition(filtPost)
    }


    // GET POSTS FROM API
    const getPosts = async () => {
        try {
            let res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
            return res.data;
        } catch (err:any) {
            console.log(err);
        }
    }



    const userPosts = (arg:any) => {
        console.log(arg)
        if (arg == '') {
            setFiltPost(partition);
        } else {
            setFiltPost(partition);
            setFiltPost(
                filtPost.filter((item)=>(item?.userId == arg))
            )
        }
    }

    return (
        <div className="containerPost">
            <div className="adminOptions">
                <div className="getButton" onClick={()=>filterCards()}>ORIGINAL</div>   
                <div className="getButton" onClick={()=>filterCards()}>FILTERS</div>   
                <input className="userPosts" type="text" placeholder="User ID" defaultValue="" onChange={(e)=>userPosts(e.target.value)}/>
            </div> 

            <div className="boxPost">

                {filtPost?.map((card, index)=>(
                    <div className="card" key={index}>
                        <div className="postInfo">
                            <div className="user" onClick={()=>userPosts(card?.userId)}>{card?.userId}</div>
                            <div className="deleteButton" onClick={()=>deletePost(card?.id)}>DELETE</div>
                        </div>
                        <div className="cardInfo">
                            
                            <div className="title">{card?.title.toLocaleUpperCase()}</div>
                            <div className="text">{card?.body}</div>
                        </div>
                            
                    </div>
                    
                ))}

            </div>

        </div>
    )
}

export default PostsPage;