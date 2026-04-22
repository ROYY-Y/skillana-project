import style from "./main.module.css"

export default function BadgePage() {
  const badgeTitle = "Title";
  const badgeDescription = "Master the state-of-the-art in Natural Language Processing and beyond with the Hugging Face Transformer Expert Certification. This badge recognizes developers who can navigate the vast ecosystem of pre-trained models and datasets. The assessment evaluates your proficiency in using the 'Transformers' library to load, build, and fine-tune models for tasks like Text Classification, Named Entity Recognition (NER), and Question Answering. You will be tested on your understanding of the 'Pipeline' API for quick inference, the 'Tokenizer' for preparing model inputs, and the 'Trainer' API for efficient model training. Furthermore, the test challenges your ability to leverage the Hugging Face Hub for model sharing and the 'Datasets' library for large-scale data handling. Earning this badge confirms your status as an AI engineer who can integrate the latest research models into production applications with ease."
  const nQuestion = "10";
  const tLimit = "15";
  const pScore = "8";
  return (
    <section className={style.frame}>
        <div className ={style.mainBox}>
            
            <section className={style.boxLeft}>
                <div className = {style.imgContainer}></div>
            </section>

            <section className={style.boxRight}>
                
                <div className = {style.titleSection}>
                    <h1 style={{fontSize: "x-large"}}>{badgeTitle}</h1>
                    <div className = {style.own}>
                        <div className= {style.circle}></div>
                        <p>Own</p>
                    </div>
                </div>

                <div className={style.descriptionSection}>
                    <p style={{fontSize: "smaller"}}>{badgeDescription}</p>
                </div>

                <hr style={{color: "white", width : "90", borderTop: "1px solid"}}></hr>
                
                <p style={{fontSize: "smaller", fontWeight : "bold"}}>To earn the badge, you must pass the test based on the following criteria :</p>
                
                <div>
                    <p style={{fontSize: "smaller"}}>Number of Questions: {nQuestion} Questions</p>
                    <p style={{fontSize: "smaller"}}>Time Limit: {tLimit} Minutes</p>
                    <p style={{fontSize: "smaller"}}>Passing Score: {pScore} or more correct answers to earn the badge</p>
                </div>

                <div className={style.btn}>
                    Already Claimed
                </div>
            </section>
        
        </div>
    </section>
  )
}