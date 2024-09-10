import React from 'react';

type tableProps = {
    head: string[],
    rows: string[][],
}

const Table = (param: { className?: string, table: tableProps }) => {

    if (param.table.head.length != param.table.rows[0].length) {
        console.error("Table head and rows must have the same length");
        return <>An Error occured</>;
    }

    let className = (param.className ? param.className : "") + " content-center table-auto";
    return (
        <table className={className}>
            <thead>
                <tr>
                    {param.table.head.map((value, index) => {
                        return (
                            <th key={index} className="px-4 py-2">{value}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {param.table.rows.map((row, index) => {
                    return (
                        <tr key={index}>
                            {row.map((value, index) => {
                                return (
                                    <td key={index} className="border border-cavernous-300 dark:border-cavernous-300 px-4 py-2">{value}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export const LessonPriceTable = () => {
    return (<Table className="mt-4" table={{
        head: ["Duration", "Price"],
        rows: [
            ["30 minutes", "$20"],
            ["45 minutes", "$25"],
            ["60 minutes", "$30"],
        ]
    }} />)
}

export default Table;
