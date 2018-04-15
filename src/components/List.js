import React from 'react';

const List = ({ items, remove, toggle }) => {
    return (
        <ul>
            {items.map(item => (
                <li key={item.id} style={{ cursor: 'pointer' }}>
                    <span
                        onClick={() => toggle && toggle(item.id)}
                        style={{ textDecoration: item.complete && 'line-through' }}
                    >
                        {item.name}
                    </span>
                    <span onClick={() => remove(item)}>&nbsp;[X]</span>
                </li>
            ))}
        </ul>
    );
};

export default List;
