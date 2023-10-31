import { useState } from "react";
import Image from 'next/image'
import styles from 'styles/post-banner.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons'

export function BannerImage({ defaultImage }) {
  const emptyImage = '/assets/images/no-image.png';
  const [imageURL, setImageURL] = useState(defaultImage ?? emptyImage);
  const [bannerLocation, setBannerLocation] = useState('');
  const [loader, setLoader] = useState('none');

  const uploadToServer = (event) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];

      const body = new FormData();
      body.append("file", image);
      setLoader('block');
      fetch("/api/upload", { method: "POST", body })
          .then((response) => response.json())
          .then((response) => {
              setBannerLocation(response.location);
              setImageURL(response.location);
              setTimeout(() => setLoader('none'), 2300);
            });
    }
  };

  const removeImage = (event) => {
    setImageURL(emptyImage);
    setBannerLocation('');
  }

  return (
      <>
        <div className={styles.bannerUpload}>
            <FontAwesomeIcon className={styles.bannerLoader} style={{ display: loader }} icon={faSpinner} size="4x" color="#fab700" spin />
            <div className={styles.bannerEdit}>
                <input type="file" accept="image/*" id="postBanner" name="postBanner" onChange={uploadToServer} />
                <input type="hidden" name="postBannerPath" value={bannerLocation} />
                <label htmlFor="postBanner" className="postBannerLabel"><FontAwesomeIcon icon={faPencil} /></label>
            </div>
            <div className={styles.bannerDelete}>
                <button className={styles.bannerDeleteBtn} type="button" onClick={removeImage}><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <div className={styles.bannerPreview}>
                  <Image src={imageURL} alt="" fill className={styles.image} />
            </div>
        </div>
      </>
  );
}