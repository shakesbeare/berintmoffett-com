import React from 'react';
import ReactMarkdown from 'react-markdown';
import { LessonPriceTable } from './table';

const Header = (param: { size: number, children?: React.ReactNode }) => {
    return (
        <div className={`text-${5 - param.size}xl my-4`}>
            {param.children}
        </div>
    )
}

const Paragraph = (param: { children?: React.ReactNode }) => {
    return (
        <div className="my-4">
            {param.children}
        </div>
    )
}

const Markdown = (param: { children?: string }) => {
    return (
        <ReactMarkdown
            components={{
                h2(props) {
                    const { node, ...rest } = props;
                    return (<Header size={2} {...rest} />)
                },
                h3(props) {
                    const { node, ...rest } = props;
                    return (<Header size={3} {...rest} />)
                },
                p(props) {
                    const { node, ...rest } = props;
                    if (rest.children != null) {
                        // begin searching  for table
                        // this looks for ${table_name} and replaces it with a table}
                        let text = rest.children.toString();
                        if (text != null) {
                            if (text.startsWith('$')) {
                                text = text.substring(2, text.length - 1);
                                switch (text) {
                                    case 'lesson_price_table': {
                                        return <LessonPriceTable />
                                    }
                                    default: {
                                        console.log("Unrecognized table spec");
                                        return <></>
                                    }
                                }
                            }
                        }
                        // end searching for table
                    }
                    return (<Paragraph {...rest} />)
                }
            }}
        >
            {param.children}
        </ReactMarkdown>
    )
}

export default Markdown;
