import gifticon from './icons/icongift.png'
import './BoxIdeasList.css'

function SingleIdea(props){
    const {idea, idea_id} = props;

    const matches = idea?(idea.split('"')):([]);
    const descs =  matches[2]?(matches[2].split('-')):([]);

    const general_desc = descs[0];
    const itemlist = descs.slice(1);

    return(
        <div className='single-idea' key={idea_id}>
            <img src={gifticon} alt="gift icon" />
            <h2> {matches[1]} </h2>
            <p> {general_desc}  </p>
            <h3> Contains: </h3>
            <ul>
            {itemlist.map((val, index) => (
                <li key={index}> {val} </li>
            ))}
            </ul>
        </div>
    );
}


function BoxIdeasList(props) {
    const {ideas} = props;

    console.log(ideas);

    const sentences = ideas?(ideas.split('---')):([]);

    // Remove any empty strings from the result
    const filteredSentences = sentences.filter((sentence, index) => sentence.trim() !== '' && index % 2).slice(0, 3);

    return (
        <div className="Ideas List">
            {filteredSentences.map((sentence, index) => (
                <SingleIdea idea={sentence} idea_id={index+1} />
            ))}
        </div>
    );
}

export default BoxIdeasList;
