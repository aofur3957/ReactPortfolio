import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setFlickr } from '../../redux/actions';

export default function Pics(){
    const picData = useSelector(state=>state.flickrReducer.flickr);
    const dispatch = useDispatch();

    const getFlickr = async ()=>{
        const api_key = '6695bb82cf9a3db1962df3f386dd83e8';
        const method1 = 'flickr.interestingness.getList';
        const num = 9;
        const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;

        await axios.get(url)
        .then(json=>{
            // console.log(json);
            dispatch(setFlickr(json.data.photos.photo));
        })
    }

    useEffect(()=>{
        getFlickr();
    },[])

    
    return (
        <section id="pics" className="myScroll">
            <div className="inner">
                <h1>PICS</h1>
                <ul>
                    {picData.map((pic, idx)=>{
                        return (
                            <li key={idx}>
                                <img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}