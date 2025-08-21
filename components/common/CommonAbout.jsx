import React from "react";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";

export default function CommonAbout({
  title,
  description,
  sections = [],
  parentClass = "section-pre-approved",
}) {
  return (
    <section className={parentClass}>
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="content">
              <div className="heading-section">
                <h3 className="title split-text effect-right">
                  <SplitTextAnimation text={title} />
                </h3>
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

              {sections.map((section, index) => (
                <div className="heading-section" key={index}>
                  <h4 className="title split-text effect-right text-color-heading">
                    {section.title}
                  </h4>
                  {section.description && (
                    <p className="text-1 split-text split-lines-transform text-color-default">
                      {section.description}
                    </p>
                  )}
                  {section.listItems && (
                    <ul className="text-1 split-text split-lines-transform text-color-default">
                      {section.listItems.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {item.title && <strong>{item.title}:</strong>}{" "}
                          {item.content}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.paragraphs &&
                    section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        className="text-1 split-text split-lines-transform text-color-default"
                      >
                        {paragraph}
                      </p>
                    ))}
                  {section.subsections &&
                    section.subsections.map((subsection, subIndex) => (
                      <div className="subsection" key={subIndex}>
                        {subsection.title && (
                          <h5 className="subtitle text-color-heading">
                            {subsection.title}
                          </h5>
                        )}
                        {subsection.description && (
                          <p className="text-1 split-text split-lines-transform text-color-default">
                            {subsection.description}
                          </p>
                        )}
                        {subsection.listItems && (
                          <ul className="text-1 split-text split-lines-transform text-color-default">
                            {subsection.listItems.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                dangerouslySetInnerHTML={{ __html: item }}
                              />
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
