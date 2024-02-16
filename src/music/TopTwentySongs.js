import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useUser } from '../Routes/UserProvider';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TopTwentySongs = () => {
    const { getUser } = useUser();
    const [list, setList] = useState([]);

    const songsList = async (input) => {
        const queryString = {
            featured: input
        }
        axios.get('https://academics.newtonschool.co/api/v1/music/song', {
            params: {
                filter: JSON.stringify(queryString)
            }
        }).then((response) => {
            setList(response.data.data);
        }).catch((error) => {
            console.log(error)
        })

        useEffect(() => {
            songsList("Top 20 of this week");
        }, []);
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,

                }
            },
            {
                breakpoint: 968,
                settings: {
                    slidesToShow: 2,
                    arrows: false,

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    arrows: false,

                }
            }
        ]
    };

    return (
        <>
            {getUser && getUser.status === "success" && (<>
                <div className="text-white font-bold text-xl lg:ml-20 ml-6">
                    Top 20 of this week
                </div>
                <Slider {...settings} className="xl:px-8 lg:px-8 md:px-4 sm:px-0 xl:ml-8 lg:ml-8 md:ml-4 sm:ml-0 mr-8 ">
                    {list.map((obj, index) => {
                        return (
                            <div key={index} onClick={() => { handlePlaySortedSong(obj) }}>
                                <Cards
                                    src={obj.thumbnail}
                                    alt={obj.title}
                                    title={obj.title}
                                    subtitle={obj.artist[0].description}
                                />
                            </div>
                        );
                    })}
                </Slider>
            </>)}
        </>
    )
}

export default TopTwentySongs
