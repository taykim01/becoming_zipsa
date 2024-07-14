import Container from '@/lib/container';
import Images from '@/lib/images';
import Image from 'next/image';
import Components from './components';

export default async function Page() {
    return (
        <Container.Main headerTitle="고양이 별" bgClass="bg-type2" titleColor='white'>
            <div className='flex flex-col items-center gap-20'>
                <Image src={Images.moon} width={305} height={150} alt={""} />
                <Components.Text />
            </div>
            <Components.ButtonComponent />
        </Container.Main>
    )
}