import { useState } from "react";
import Image from 'next/image'

export function BannerImage(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [bannerLocation, setBannerLocation] = useState('');

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
    //   setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {        
    const body = new FormData();
    body.append("file", image);    
    fetch("/api/upload", { method: "POST", body })
        .then((response) => response.json())
        .then((response) => {
            setCreateObjectURL(response.location);
            setBannerLocation(response.location);
        });
  };

  return (
    <div>
      <div>
        <Image
            src={createObjectURL ?? '/assets/images/twitter.png'}
            alt=""
            width={100}
            height={60}
        />
        <h4>Select Image</h4>
        <input type="file" name="postBanner" onChange={uploadToClient} />
        <input type="hidden" name="postBannerPath" value={bannerLocation} />
        <button
          className="btn btn-primary"
          type="button"
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </div>
    </div>
  );
}