import React, { useState } from "react";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import Image from "next/image";
//import ModalVideo from "react-modal-video";

export default function ServiceAbout({
  title,
  description,
  imagePath,
  imagePath1,
  imagePath2,
  secondImagePath,
  videoId,
  parentClass = "section-about style-2",
  imageAlt = "Service Image",
  videoButtonText = "Watch Video",
  additionalContent,
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className={parentClass}>
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="content-about">
              <div className="heading-about">
                <h2 className="title split-text effect-right">
                  <SplitTextAnimation text={title} />
                </h2>
                {Array.isArray(description) ? (
                  description.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-1 split-text split-lines-transform text-color-default"
                    >
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-1 split-text split-lines-transform text-color-default">
                    {description}
                  </p>
                )}
              </div>
              {additionalContent && additionalContent}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="image-about">
              <div className="image-1">
                {(imagePath || imagePath1 || secondImagePath) && (
                  <Image
                    src={imagePath || imagePath1 || secondImagePath}
                    alt={imageAlt}
                    width={600}
                    height={400}
                    style={{ height: "auto" }}
                  />
                )}
              </div>
              {(imagePath2) && (
                <div className="image-3">
                  <Image
                    src={imagePath2}
                    alt={`${imageAlt} 2`}
                    width={300}
                    height={200}
                    style={{ height: "auto" }}
                  />
                </div>
              )}
              {/*{videoId && (
                <>
                  <ModalVideo
                    channel="youtube"
                    autoplay
                    isOpen={isOpen}
                    videoId={videoId}
                    onClose={() => setOpen(false)}
                  />
                  <div className="image-2">
                    <div className="wrap-video">
                      <div className="popup-youtube" onClick={() => setOpen(true)}>
                        <svg
                          width="17"
                          height="21"
                          viewBox="0 0 17 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 0L17 10.5L0 21V0Z"
                            fill="#F8F8F8"
                          />
                        </svg>
                      </div>
                      <span className="text">{videoButtonText}</span>
                    </div>
                  </div>
                </>
              )}*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}