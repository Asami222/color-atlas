import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/svg/testlogo.svg"

export function Logo () {
  return (
    <Link href="/">
      <div className="w-40 mx-auto">
        <Image
          quality="75"
          src={logo}
          alt="Color Atlas"
          sizes="160px"
          loading="eager"
          style={{width: '100%', height: 'auto'}}
        />
      </div>
    </Link>
  )
}