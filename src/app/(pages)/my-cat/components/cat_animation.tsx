"use client"

import { useRecoilState } from 'recoil';
import { catFeelingState } from '@/recoil/cat_feeling';
import CatHearts from './cat_hearts';
import { useEffect, useState } from 'react';
import CatComponent from '@/lib/cat_component';
import ReadCat from '@/repository/v1.0.0/cat/read_cat';
import { Cat } from '@/repository/v1.0.0/cat/cat';

export default function CatAnimation() {
    const read_cat = new ReadCat()


    const [catData, setCatData] = useState({} as Cat)
    const readCatData = async () => {
        const response = await read_cat.read()
        if (!response.success) {
            // alert(response.message)
            return
        }
        setCatData(response.data)
    }

    useEffect(() => {
        readCatData()
    }, [])

    const heartLocations = [
        { x: 20, y: 0, size: 1.0 },
        { x: 260, y: 0, size: 1.3},
        { x: 80, y: 100, size: 1.1 },
        { x: 190, y: 130, size: 0.7 },
    ]


    const [catFeeling, setCatFeeling] = useRecoilState(catFeelingState)
    useEffect(() => {
        setTimeout(() => {
            setCatFeeling("negative")
        }, 2000);
    }, [catFeeling])


    return (
        <div className='relative w-full h-full'>
            {
                heartLocations.map((location, i) => (
                    <div key={i} className='absolute' style={{ left: location.x, bottom: location.y, transform: `scale(${location.size})` }}>
                        {catFeeling === "positive" && <CatHearts />}
                    </div>
                ))
            }
            {
                catData.color && <CatComponent color={catData.color} />
            }
        </div>
    );
}