import Image from 'next/image';
import Dialog, { type DialogProps } from 'rc-dialog';

const BANNERS = [
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_2.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_3.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_4.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_5.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_6.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_7.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_8.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_9.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_10.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_11.jpg',
];

type Props = DialogProps & { onClick: (banner: string) => void };

export default function BannerModal({ visible, onClose, onClick }: Props) {
  return (
    <Dialog
      title="Choose a banner"
      className="max-w-[calc(100vw-32px)]"
      visible={visible}
      onClose={onClose}
      width="100%"
    >
      <div className="w-full grid grid-cols-6 gap-2">
        {BANNERS.map((banner) => (
            <Image
              key={banner}
              src={banner}
              className="object-cover w-full cursor-pointer"
              width={190}
              height={150}
              alt="banner"
              onClick={() => onClick(banner)}
            />
        ))}
      </div>
    </Dialog>
  );
}
