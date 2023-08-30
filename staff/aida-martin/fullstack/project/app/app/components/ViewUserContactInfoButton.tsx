import { useState } from 'react'
import GeneralButton from './GeneralButton'
import Characteristic from './Characteristic'

export default function ViewUserContactInfoButton({
  salePop,
}: {
  salePop: {
    author: {
      phoneNumber: string
    }
  }
}) {
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false)

  return (
    <>
      {!isInfoVisible && (
        <GeneralButton
          className="justify-self-center w-full mt-6"
          tittle="Show contact info"
          onClick={() => setIsInfoVisible(true)}
        ></GeneralButton>
      )}

      {isInfoVisible && (
        <ul className="flex flex-col mt-6">
          <Characteristic
            name="Phone number:"
            value={`${salePop.author.phoneNumber.replace(
              /(\d{3})(\d{3})(\d{3})/,
              '$1 $2 $3'
            )}`}
          ></Characteristic>
        </ul>
      )}
    </>
  )
}
