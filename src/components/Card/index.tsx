import './styles.css'

interface ICard {
    pokemonName: string
}

export function Card({pokemonName}: ICard){

    return(
        <div className="CardBody">
            <p>{pokemonName}</p>
        </div>
    )
}