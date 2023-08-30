import { SalePop } from '../../data/models'

export default async function retrieveUserSalePops({
  userId,
}: {
  userId: string
}) {
  //TODO validators

  const userSalePops = await SalePop.find(
    {
      $and: [
        { author: userId },
        {
          status: ['Available', 'Reserved'],
        },
      ],
    },
    'price images status'
  )
    .limit(20)
    .populate('author', 'name avatar')
    .populate('pop', 'name')
    .sort('-date')
    .lean()

  userSalePops.forEach((salePop: any) => {
    salePop.id = salePop._id.toString()
    delete salePop._id

    if (salePop.pop._id) salePop.pop.id = salePop.pop._id.toString()
    delete salePop.pop._id

    if (salePop.author._id) salePop.author.id = salePop.author._id.toString()
    delete salePop.author._id
  })

  return userSalePops
}
