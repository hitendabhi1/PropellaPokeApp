import './SelectedContainer.scss';
type Selected = {
    species: {
        name: String
    }
    height: String
    weight: String
    abilities: [{
        ability: {
            name: String
        }
    }]
}

function SelectedContainer({ selectedPokemon }: { selectedPokemon: Selected }) {

    return (
        <div className="app__selected">
            {
                selectedPokemon.hasOwnProperty('species') &&
                selectedPokemon?.species.hasOwnProperty('name') && (
                    <div className="app__selected__name">
                        {selectedPokemon?.species.name}
                    </div>
                )
            }

            <div className="app__selected__content">
                {
                    selectedPokemon?.hasOwnProperty('height') && (
                        <p className="app__selected__height">
                            Height: {selectedPokemon?.height}
                        </p>
                    )
                }
                {
                    selectedPokemon?.hasOwnProperty('weight') && (
                        <p className="app__selected__weight">
                            Weight: {selectedPokemon?.weight}
                        </p>
                    )
                }
                {
                    selectedPokemon?.hasOwnProperty('abilities') && (
                        <>
                            <p>Abilities: </p>
                            <ul className="app__selected__abilities">
                                {
                                    selectedPokemon?.abilities.map(abilityObject => (
                                        abilityObject.hasOwnProperty('ability') && (
                                            <li>{abilityObject.ability.name}</li>
                                        )
                                    ))
                                }
                            </ul>
                        </>
                    )
                }
            </div>

        </div>
    )
}

export default SelectedContainer
