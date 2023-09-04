// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */

//id
//name
//height
//location
//facts
//image
export async function seed(knex) {
  await knex('plants').insert([
    {
      id: 1,
      name: 'Angel Wing Begonia',
      height: '140cm',
      location: 'Indoor',
      facts: 'Been flowering for two years',
      image: '',
    },
    {
      id: 2,
      name: 'Peace Lily',
      height: '40cm',
      location: 'Indoor',
      facts: 'Flowered only once',
      image: '',
    },
    {
      id: 3,
      name: 'Snake Plant',
      height: '120cm',
      location: 'Indoor',
      facts: 'Made two baby snake plants',
      image: '',
    },
    {
      id: 4,
      name: 'Pothos',
      height: '15cm',
      location: 'Indoor',
      facts: 'Has white variegation',
      image: '',
    },
    {
      id: 5,
      name: 'Mini Monstera',
      height: '30cm',
      location: 'Indoor',
      facts: 'More upright than expected',
      image: '',
    },
    {
      id: 6,
      name: 'String Of Pearls',
      height: '120cm',
      location: 'Indoor',
      facts: 'Long boi',
      image: '',
    },
  ])
}
