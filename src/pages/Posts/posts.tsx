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

    // HOOK TO EDITION
    const [edit, setEdit] = useState({title:'',body:''});
    const [allowEdit, setAllowEdit] = useState<boolean>(false);
    
    useEffect(() => {
        logging.info(`Loading ${props.name}`);  
    }, [props.name])

    useEffect(()=>{
        fetchPosts();
    },[])


    // GET POSTS FROM API
    const getPosts = async () => {
        try {
            let res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
            return res.data;
        } catch (err:any) {
            console.log(err);
        }
    }

    // SET POSTS ON ORIGINAL HOOK
    const fetchPosts = async () => {
        const res = await getPosts();
        setPost(res);
    }

    // SET CLEVERPY TEST TO ORIGINAL VERSION
    const original = () => {
        setFiltPost(post);
        setPartition(post);
    }

    // SET UPDATE 
    const update = () => {
        setPartition(filtPost)
    }
    
    // DELETE POST 
    const deletePost = (arg:any) => {
        setFiltPost(
            filtPost.filter((item)=>(item?.id !== arg))
        )
    }

    // FILTERS 
    const filters = (opt:string, value:any) => {

        // WHEN DELETE SEARCH CONTENT
        if (value === ''){
            update();
        } else {
            switch(opt){                            // TO DO TITLE SEARCH???
                case "userId":
                    setPartition(
                        filtPost.filter((item)=>(item?.userId == value))
                    )
                    break;
                case "postId":
                    setPartition(
                        filtPost.filter((item)=>(item?.id == value))
                    )
                    break;
                default:
                    break;
            }
        }
    }

    // HANDLER EDITION INPUTS
    const edition = (e:any) => {
        setEdit({...edit, [e.target.name]: e.target.value});
    }
    
    // ACTIVATE EDITION MODE AND SEND SELECTED POST
    const editPost = (id:number) => {
        setAllowEdit(true);
        setPartition(
            filtPost.filter((item)=>(item?.id == id))
        )
    }

    // SAVE EDITED POST
    const saveEdit = (arg:number) => {
        filtPost[arg].title = edit.title;
        filtPost[arg].body = edit.body;
        update();
        setAllowEdit(false);
    }

    const cancelEdit = () => {
        setAllowEdit(false);
    }

    if (allowEdit === true) {

        return (
            <div className="containerEdition">
                {partition?.map((card, index)=>(
                    <div className="card" key={index}>
                        <div className="postInfo">
                            <div className="deleteButton" onClick={()=>saveEdit(card?.id)}>SAVE</div>
                            <div className="deleteButton" onClick={()=>cancelEdit()}>CANCEL</div>
                        </div>
                        <div className="cardInfo">
                            <label className="labelsEdit">Title</label>
                            <input type="text" className="inputEdit" name="title" placeholder={card?.title.toLocaleUpperCase()} onChange={(e)=>edition(e)}/>
                            <label className="labelsEdit">Text</label>
                            <textarea className="textEdit" name="body" placeholder={card?.body} onChange={(e)=>edition(e)}></textarea>
                        </div>
                    </div>
                ))}
            </div> 
        )

    } else {

        return (
            <div className="containerPost">
                <div className="adminOptions">
                    <div className="buttons">
                        <div className="getButton" onClick={()=>original()}>CLEAN</div>     
                        <div className="getButton" onClick={()=>update()}>UPDATE</div>
                    </div>
                    <div className="inputsS">
                        <input className="inputFilters" type="text" name="userId" placeholder="User ID" onChange={(e)=>filters(e.target.name, e.target.value)}/>
                        <input className="inputFilters" type="text" name="postId" placeholder="Post ID" onChange={(e)=>filters(e.target.name, e.target.value)}/>
                    </div>     
                </div> 

                <div className="boxPost">

                    {partition?.map((card, index)=>(
                        <div className="card" key={index}>
                            <div className="postInfo">
                                <div className="user" onClick={()=>filters("userId", card?.userId)}>{card?.userId}</div>
                                
                                <div className="deleteButton" onClick={()=>editPost(card?.id)}>EDIT</div>
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
}

export default PostsPage;