import { FormEvent, useRef } from 'react';
import { getStorage, getFirestore, getAuth } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore/lite';

export const Logged = () => {
    const form = useRef<HTMLFormElement | null>(null);

    const submitPortfolio = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitPortfolio', form.current);
        // const name = form.current?.[0]?.value;
        // const description = form.current?.[1]?.value;
        // const url = form.current?.[2]?.value;
        // const image = form.current?.[3]?.files[0];

        const name = 'form.current?.[0]?.value';
        const description = 'form.current?.[1]?.value';
        const url = 'form.current?.[2]?.value';
        const image: File = new File([''], 'image.jpg', { type: 'image/jpeg' });

        const storageRef = ref(getStorage(), `portfolio/${image.name}`);

        uploadBytes(storageRef, image).then(
            (snapshot) => {
                getDownloadURL(snapshot.ref).then(
                    (downloadUrl) => {
                        savePortfolio({
                            name,
                            description,
                            url,
                            image: downloadUrl,
                        });
                    },
                    (error) => {
                        console.log(error);
                        savePortfolio({
                            name,
                            description,
                            url,
                            image: null,
                        });
                    }
                );
            },
            (error) => {
                console.log(error);
                savePortfolio({
                    name,
                    description,
                    url,
                    image: null,
                });
            }
        );
    };

    const savePortfolio = async (portfolio: {
        name: string;
        description: string;
        url: string;
        image: string | null;
    }) => {
        try {
            await addDoc(collection(getFirestore(), 'portfolio'), portfolio);
            window.location.reload();
        } catch (error) {
            alert('Failed to add portfolio');
        }
    };

    return (
        <div className="dashboard">
            <form ref={form} onSubmit={submitPortfolio}>
                <p>
                    <input type="text" placeholder="Name" />
                </p>
                <p>
                    <textarea placeholder="Description" />
                </p>
                <p>
                    <input type="text" placeholder="Url" />
                </p>
                <p>
                    <input type="file" placeholder="Image" />
                </p>
                <button type="submit">Submit</button>
                <button onClick={() => getAuth().signOut()}>Sign out</button>
            </form>
        </div>
    );
};
