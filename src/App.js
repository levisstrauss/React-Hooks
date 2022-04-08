import React, {createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState} from 'react';

// react-toastify


function App() {
     // #################UseState##########################
    const [count, setCount] = useState(0);


    //####################### UseEffect#######################
    useEffect(() => {
        console.log("Hello world!");
    }, [count])


    //################## useContext##############################
    const moods = {
        happy: '😂',
        sad: '🥲'
    }
    // For sharing the mood  between different multiple component

    const MoodContext = createContext(moods);

    function MoodEmoji() {
        const mood = useContext(MoodContext)
        return <p>{mood}</p>;

        // Consumer component
        // return <MoodContext.Consumer>
        //     { ({mood}) =><p>{mood}</p> }
        // </MoodContext.Consumer>
    }

    //##################  end useContext ##############################


    // ################Use useRef to get a specific element from the dom###########
    const myBtn  = useRef(null);
    const clickIt = () => myBtn.current.click();



    //#################### useReducer()#########################################
    //                                      reducer function and the initial state
    const [state, dispatch] = useReducer(reducer, 0);
    function reducer(state, action){
       switch(action.type){
           case 'increment':
               return state + 1;
           case 'decrement':
               return state - 1;
           default:
               throw new Error();
       }
    }


    //###############  useMemo() ################ Memorize a return value

    const expensiveCount = useMemo(() =>{
        return count ** 2;
    }, [count])

    // For memorizing the entire function useCallback()
    const expensiveCounts = useCallback(() =>{
        return count ** 2;
    }, [count])


        // Use displayName() allow us to wrap many hooks call inside of it
        // and return


       /*
       ############## Calling an API###############
           import axios from axios
           const apiEndpoints = "Url";
           state = {
             posts: []
           }
           async componentDidMount() {
            const {data: posts } = await axios.get("Url")
            this.setState({posts})
           }
           ################ creating data ################
           handleAdd = async() => {
           const obj = { title: "a", body: "b"};
           const {data: post } = await axios.post(url, obj);
           const posts = post, ...this.state.posts];
           this.setState({posts});
           }

           ################ Update data ################
           axios.patch(url + '/' + post.id, {title: post.title });
           handleUpdate = async post => {
           post.title = "Update";
           const {data}  = axios.put(url + '/' + post.id, post);
           const posts = [...this.state/posts];
           const index = posts.indexOf(post);
           posts[index] = {...post};
           this.setState({posts});


           ################ deleting data ################
            await axios.delete(url, + "/" + post.id);

            const post = this.state.posts.filter(p => p.id !== post.id;
            this.setState({ posts})

           }
        */



    return (
      <>
          {/* UseReducer()*/}
           Count: {state}
          <button onClick={()=>dispatch({type: 'decrement'})}>-</button>
          <button onClick={()=>dispatch({type: 'increment'})}>+</button>
          {/* UseRef*/}
          <button ref={myBtn}></button>

          {/* UseState*/}
          <button onClick={() =>setCount(count +1)}>

          </button>
          <h1>
              {count}
          </h1>
          {/*Context*/}
          <MoodContext.Provider value={moods.sad}>
                 <MoodEmoji />
          </MoodContext.Provider>
      </>

  );
}

export default App;
