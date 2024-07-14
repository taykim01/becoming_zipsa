"use client"

import { CatType } from '@/repository/v1.0.0/cat/cat';
import ObjLoader from '@/utils/obj_loader';

export default function CatComponent(props: {color: CatType}) {
    const catColors: Record<CatType[number], string> = {
        "치즈냥이": "/cat_cheese.mtl",
        "깜냥이": "/cat_black.mtl",
        "흰냥이": "/cat_white.mtl",
    }
    return (
        <ObjLoader objUrl="/cat.obj" mtlUrl={catColors[props.color]} />
    );
}