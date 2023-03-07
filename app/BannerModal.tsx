'use client';
import { Col, Modal, ModalProps, Row } from 'antd';
import Image from 'next/image';

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

type Props =  ModalProps & { onClick: (banner: string) => void }


export default function BannerModal({ open, onCancel, onClick }: Props) {
  return (
    <Modal title="Choose a banner" open={open} onCancel={onCancel} width="100%" >
      <Row gutter={[2, 2]} className="w-full">
        {BANNERS.map((banner) => (
          <Col key={banner} span={4} className="cursor-pointer">
            <Image src={banner} className="object-cover" width={190} height={150} alt="banner" onClick={() => onClick(banner)} />
          </Col>
        ))}
      </Row>
    </Modal>
  );
}
