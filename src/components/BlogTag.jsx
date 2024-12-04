import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import blogByTagAction from "../actions/blogByTagAction";
import Select from "react-select";

export default function BlogTag({ tag }) {
    const { tagList, activeTag } = useSelector((state) => state.blog);
    const dispatch = useDispatch();
    const options = tagList.map((str) => ({ value: str, label: str }));

    function handleTagChange(selectedOptions) {
        dispatch(blogByTagAction(selectedOptions.value));
    }

    return (
        <>
            {options && (
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            width: '80vw',
                            marginBottom: '5em',
                            borderColor: 'orange'
                        }),
                        option: (baseStyles, state) => ({
                            ...baseStyles,
                            width: '80vw',
                            borderColor: state.onHover ? 'orange' : 'grey',
                        }),
                        valueContainer: (baseStyles, state) => ({
                            ...baseStyles,
                            width: '80vw',
                        }),
                    }}
                    options={options} 
                    isSearchable
                    onChange={handleTagChange}
                    placeholder="Pick a tag"
                />
            )}
        </>
    );
}
