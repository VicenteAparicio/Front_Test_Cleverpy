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

    // HOOK TO RECEIVE POSTS FROM AXIOS (ORIGINAL DATABASE)
    const [post, setPost] = useState<IPost[]|[]>([]);

    // SAVE OBJECT ARRAY FOR WORK WITH HIM (EDITABLE DATABASE)
    const [filtPost, setFiltPost] = useState<IPost[]|[]>([]);

    // SAVE OBJECT TO PRINT WITH THE FILTERS USER IS WORKING ON
    const [partition, setPartition] = useState<IPost[]|[]>([]);

    // HOOKS TO SAVE TITLE AND BODY EDITION
    const [edit, setEdit] = useState({title:'',body:''});

    // HOOK TO ALLOW EDITION
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
        } catch (err) {
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
    const deletePost = (arg:number) => {
        setFiltPost(
            filtPost.filter((item)=>(item?.id !== arg))
        )
    }

    // FILTERS 
    const filters = (opt:string, value:string) => {

        // WHEN DELETE SEARCH CONTENT
        if (!value){
            update();
        } else {
            switch(opt){
                case "userId":
                    setPartition(
                        filtPost.filter((item)=>(item?.userId === parseInt(value)))
                    )
                    break;
                case "postId":
                    setPartition(
                        filtPost.filter((item)=>(item?.id === parseInt(value)))
                    )
                    break;
                case "title":
                    if (value.length>2){
                        setPartition(
                            filtPost.filter ((item) => 
                                item.title.toLowerCase().includes(value.toLocaleLowerCase()))
                        )   
                    }
                    break;
                default:
                    break;
            }
        }
    }

    // HANDLER EDITION INPUTS
    const edition = (arg:string, value:string) => {
        setEdit({...edit, [arg]: value});
    }
    
    // ACTIVATE EDITION MODE AND SEND SELECTED POST
    const editPost = (id:number) => {
        setAllowEdit(true);
        setPartition(
            filtPost.filter((item)=>(item?.id === id))
        )
    }

    // SAVE EDITED POST
    const saveEdit = (arg:number) => {
        filtPost[arg].title = edit.title;
        filtPost[arg].body = edit.body;
        update();
        setAllowEdit(false);
    }

    // CANCEL EDITION
    const cancelEdit = () => {
        setAllowEdit(false);
        update();
    }

    if (allowEdit === true) {
        // EDITION RETURN
        return (
            <div className="containerEdition">

                {partition?.map((card, index)=>(
                    <div className="card" key={index}>
                        <div className="boxButtons">
                            <div className="cardButton" onClick={()=>saveEdit(card?.id)}>SAVE</div>
                            <div className="cardButton" onClick={()=>cancelEdit()}>CANCEL</div>
                        </div>
                        <div className="cardInfo">
                            <label className="labelsEdit">Title</label>
                            <input type="text" className="inputEdit" name="title" placeholder={card?.title.toLocaleUpperCase()} onChange={(e)=>edition(e.target.name, e.target.value)}/>
                            <label className="labelsEdit">Text</label>
                            <textarea className="textEdit" name="body" placeholder={card?.body} onChange={(e)=>edition(e.target.name, e.target.value)}></textarea>
                        </div>
                    </div>
                ))}
                
            </div> 
        )

    } else {
        // DEFAULT RETURN
        return (
            <div className="containerPost">

                <div className="adminOptions">
                    <div className="boxButtons">
                        <div className="adminButton" onClick={()=>original()}>CLEAN</div>     
                        <div className="adminButton" onClick={()=>update()}>UPDATE</div>
                    </div>
                    <div className="boxButtons">
                        <input className="inputFilters" type="text" name="userId" placeholder="User ID" onChange={(e)=>filters(e.target.name, e.target.value)}/>
                        <input className="inputFilters" type="text" name="postId" placeholder="Post ID" onChange={(e)=>filters(e.target.name, e.target.value)}/>
                        <input className="inputFilters" type="text" name="title" placeholder="Title" onChange={(e)=>filters(e.target.name, e.target.value)}/>
                    </div>     
                </div> 

                <div className="boxPost">
                    {partition?.map((card, index)=>(
                        <div className="card" key={index}>
                            <div className="boxButtons">
                                <div className="cardButton" onClick={()=>filters("userId", card?.userId.toString())}>{card?.userId} | {card?.id}</div>
                                <div className="cardButton" onClick={()=>editPost(card?.id)}>EDIT</div>
                                <div className="cardButton" onClick={()=>deletePost(card?.id)}>DELETE</div>
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