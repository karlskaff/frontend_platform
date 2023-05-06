import axios from 'axios'
import { React, useState, useEffect } from "react";
import './newsItem.css'

const NewsItem = ({ title, description, url, urlToImage}) => {
    return(
        <div className='news-app'>
            <div className='news-item'>
                <img className='news-img' src={urlToImage} alt={urlToImage}/>
                <h3 className='news-item-title'><a href={url}>{title}</a></h3>
                <p className='news-item-descriptio'>{description}</p>

            </div>

        </div>
    )

}

export default NewsItem

