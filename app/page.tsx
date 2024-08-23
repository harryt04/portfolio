import { ThemeSwitcher } from '@/components/custom/themeSwitcher'
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Home() {
  return (
    <>
      {/* vertical and horizontal center */}
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <ThemeSwitcher />
        <div className="grid w-full items-center justify-center gap-4 p-4">
          <Avatar className="h-64 w-64 place-self-center">
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/22422276?v=4"
              alt="@harryt04"
            />
            <AvatarFallback>HT</AvatarFallback>
          </Avatar>
          <p className="text-2xl font-bold">Hi, I&apos;m Harry Thomas</p>
          <p className="text-m">
            I&apos;m a full stack web and mobile developer.
          </p>
          <p className="text-m">
            I have a passion for separating signal from noise.
          </p>
          <Link href="/resume.pdf">
            <Button className="w-48" variant="outline">
              My resume
            </Button>
          </Link>
          <Link
            href="https://github.com/harryt04?tab=repositories"
            target="_blank"
          >
            <Button className="w-48" variant="secondary">
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              My Github
            </Button>
          </Link>
          <Link
            href="https://www.linkedin.com/in/harrison-thomas04/"
            target="_blank"
          >
            <Button className="w-48" variant="secondary">
              <LinkedInLogoIcon className="mr-2 h-4 w-4" />
              My LinkedIn
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
