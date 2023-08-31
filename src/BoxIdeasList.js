function SingleIdea(props){
    const {idea, idea_id} = props;

    const matches = idea?(idea.split('"')):([]);
    const descs =  matches[2]?(matches[2].split('-')):([]);

    const filtered = descs.slice(1).map(item => {
        const splited = item.split(':');

        if (splited.length < 2){
            return ['general-desc', splited[0].trim()];
        } else {
            return [splited[0].trim(), splited[1].trim()];
        }
    });

    const general_desc = filtered.filter(tuple => tuple[0] === 'general-desc').map(item => item[1]).join('. ');
    const itemlist = filtered.filter(tuple => tuple[0] !== 'general-desc');

    return(
        <div className='single-idea' key={idea_id}>
            <h2> {matches[1]} </h2>
            <p> {general_desc}  </p>
            <ul>
            {itemlist.map((val) => (
                <li>
                <b>{val[0]}: </b> {val[1]}
                </li>
            ))}
            </ul>
        </div>
    );
}


function BoxIdeasList(props) {
    const {ideas} = props;

    // Regular expression pattern to match sentences
    const pattern = /\d+\.\s+/g;

    // Split the paragraph into sentences
    const sentences = ideas?(ideas.split(pattern)):([]);

    // Remove any empty strings from the result
    const filteredSentences = sentences.filter(sentence => sentence.trim() !== '');

    return (
        <div className="Ideas List">
            {filteredSentences.map((sentence, index) => (
                <SingleIdea idea={sentence} idea_id={index+1} />
            ))}
        </div>
    );
}

export default BoxIdeasList;
