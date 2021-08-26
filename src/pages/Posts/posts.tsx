import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IPage from '../../interfaces/page';
import logging from '../../config/logging';

const PostsPage: React.FunctionComponent<IPage> = props => {

    // HOOK TO RECEIVE POSTS FROM AXIOS
    const [post, setPost] = useState<IPost[]|[]>([]);

    // HOOK TO FILTER POSTS FROM THE FIRST HOOK
    const [filtPost, setFiltPost] = useState<IPost[]|[]>([]);
    
    useEffect(() => {
        logging.info(`Loading ${props.name}`);
        getPosts();
    }, [props.name])

    interface IPost {
        id: number,
        userId: number,
        title: string,
        body: string
    }

    const deletePost = (arg:any) => {
        setFiltPost(
            filtPost.filter((item)=>(item?.id !== arg))
        )
    }

    const filterCards = () => {
        setFiltPost(post);
    }

    // GET POSTS
    const getPosts = async () => {

        axios
            .get(`https://jsonplaceholder.typicode.com/posts`)
            .then((res)=>{
                if(res){
                    setPost(res.data)
                }
            })
            .catch((error:string)=>{
                console.log(error);
            });
            filterCards();
    }

    const userPosts = (arg:any) => {
        console.log(arg)
        if (arg == 0) {
            console.log("hola")
            setFiltPost(post);
        } else {
            setFiltPost(
                filtPost.filter((item)=>(item?.userId == arg))
            )
        }
    }

    return (
        <div className="containerPost">
            <div className="adminOptions">
                <div className="getButton" onClick={()=>getPosts()}>GetPost</div>   
                <input className="userPosts" type="text" placeholder="User ID" defaultValue="0" onChange={(e)=>userPosts(e.target.value)}/>
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