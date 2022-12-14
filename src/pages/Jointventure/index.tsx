import React, { memo, useCallback, useEffect, useState } from "react"

type MyProps = {
    addItem: () => void
    children: string
}

// eslint-disable-next-line react/display-name
const ListItem = memo((props: MyProps) => {
    const addItem = props.addItem
    useEffect(() => {
        console.log("子组件ListItem 加载")
    }, [])
    useEffect(() => {
        console.log("子组件render")
    })
    return <div onClick={addItem}> {props.children} </div>
})
let count = 0
function List() {
    const [list, setList] = useState<string[]>([])

    const [name, setName] = useState("Kevin")

    useEffect(() => {
        setList(["6点起床", "7点上班", "8点早会"])
    }, [])

    /**
     * useCallback的第一个参数称为"内联回调函数"，第二个参数称为"依赖项"数组。
     * 返回的函数被称为memoized回调函数，该回调函数仅在某个依赖项改变时才会更新。
     *
     * 在子组件里面调用了useCallback返回的addI这个方法后，会执行内联回调函数；
     * 然后setState，整个组件更新，addI方法也会相应的更新。
     */

    const addI = useCallback(() => {
        list.push("行程 " + count++)
        setList([...list])
    }, [list])

    const modifyName = () => {
        setName("K3VIN" + ++count)
    }

    return (
        <>
            {list.map((item, index) => {
                return (
                    <ListItem key={index} addItem={() => addI()}>
                        {item}
                    </ListItem>
                )
            })}
            现在的名字： {name} <button onClick={modifyName}> 点击修改名字 </button>
        </>
    )
}

function Index(){
    return new Promise((r,j)=>{
        r(111)
    })

}
export default List
