import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IPage from '../../interfaces/page';
import logging from '../../config/logging';

const PostsPage: React.FunctionComponent<IPage> = props => {
    
    useEffect(() => {
        logging.info(`Loading ${props.name}`);
        getPosts();
    }, [props.name])

    useEffect(()=>{
        
    })

    interface IPost {
        id: number,
        userId: number,
        title: string,
        body: string
    }

    // const [post, setPost] = useState<IPost[]|[]>([{title:'none',userId:0,body:'none',id:0}]);
    const [post, setPost] = useState<IPost[]|[]>([]);
    const [filtPost, setFiltPost] = useState<IPost[]|[]>([]);
    // const [post, setPost] = useState([]);
    // const [filterPost, setFilterPost] = useState([]);
    // const [filtPost, setFiltPost] = useState([ title: string, userId:number, body:string, id:number ]);
    
    
    const deletePost = (arg:any) => {
        setFiltPost(
            filtPost.filter((item)=>(item?.id != arg))
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

    return (
        <div className="containerPost">
            <div className="getButton" onClick={()=>getPosts()}>GetPost</div>
            

            <div className="boxPost">

                {filtPost?.map((card, index)=>(
                    <div className="card" key={index}>
                        <div className="deleteButton" onClick={()=>deletePost(card?.id)}>DELETE</div>
                        <div className="cardInfo">
                            <div className="title">{card?.title.toLocaleUpperCase()}</div>
                            <label className="data">USER ID:</label>
                            <div className="dataInfo">{card?.userId}</div>
                            <label className="data">COMMENT:</label>
                            <div className="dataInfo">{card?.body}</div>
                        </div>
                            
                    </div>
                    
                ))}

            </div>

        </div>
    )
}

export default PostsPage;