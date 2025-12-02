import React from "react";
// import SplitTextAnimation from "@/components/common/SplitTextAnimation";

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
                <h3
                  className="title split-text effect-right"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                {Array.isArray(description) ? (
                  description.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-1 split-text split-lines-transform text-color-default"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))
                ) : (
                  <p
                    className="text-1 split-text split-lines-transform text-color-default"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
              </div>

              {sections.map((section, index) => (
                <div className="heading-section" key={index}>
                  <h4
                    className="title split-text effect-right text-color-heading"
                    dangerouslySetInnerHTML={{ __html: section.title }}
                  />
                  {section.descriptionHtml ? (
                    <p
                      className="text-1 split-text split-lines-transform text-color-default"
                      dangerouslySetInnerHTML={{
                        __html: section.descriptionHtml,
                      }}
                    />
                  ) : (
                    section.description &&
                    (Array.isArray(section.description) ? (
                      section.description.map((desc, i) => (
                        <p
                          key={i}
                          className="text-1 split-text split-lines-transform text-color-default"
                          dangerouslySetInnerHTML={{ __html: desc }}
                        />
                      ))
                    ) : (
                      <p
                        className="text-1 split-text split-lines-transform text-color-default"
                        dangerouslySetInnerHTML={{
                          __html: section.description,
                        }}
                      />
                    ))
                  )}
                  {section.listItems && (
                    <ul className="text-1 split-text split-lines-transform text-color-default">
                      {section.listItems.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {item.title && (
                            <strong
                              dangerouslySetInnerHTML={{
                                __html: `${item.title}:`,
                              }}
                            />
                          )}{" "}
                          <span
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.paragraphs &&
                    section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        className="text-1 split-text split-lines-transform text-color-default"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}
                  {section.subsections &&
                    section.subsections.map((subsection, subIndex) => (
                      <div className="subsection" key={subIndex}>
                        {subsection.title && (
                          <h5
                            className="subtitle text-color-heading"
                            dangerouslySetInnerHTML={{
                              __html: subsection.title,
                            }}
                          />
                        )}
                        {subsection.description && (
                          <p
                            className="text-1 split-text split-lines-transform text-color-default"
                            dangerouslySetInnerHTML={{
                              __html: subsection.description,
                            }}
                          />
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
