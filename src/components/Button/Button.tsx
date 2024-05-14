import React, { SVGProps } from 'react';
import cn from 'classnames';

export type ButtonProps = {
  id: string;
  type?: 'button' | 'submit' | 'reset';
  children: JSX.Element | string;
  onClick?: (e?: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
  theme?: 'primary' | 'secondary' | 'tertiary';
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  loading?: boolean;
  loadingMsg?: string;
};

const Button = ({
  id,
  type = 'button',
  children,
  onClick,
  disabled,
  theme = 'primary',
  icon: IconComponent,
  loading,
  loadingMsg,
}: ButtonProps): JSX.Element => {
  const themeClasses = {
    primary: cn(
      'bg-primary text-magnolia hover:bg-secondary active:bg-deep-blue disabled:text-white',
      {
        'disabled:bg-regular-grey': disabled,
        'disabled:bg-primary': loading,
      }
    ),
    secondary: ` 
      text-grey
      bg-white
      underline
      hover:bg-magnolia hover:border-none hover:text-grey
      active:bg-magnolia active:text-regular-grey
      disabled:bg-light-grey disabled:text-regular-grey
    `,
    tertiary: `
      text-primary 
      hover:bg-magnolia hover:text-secondary 
      active:bg-magnolia active:text-deep-blue 
      disabled:bg-white disabled:text-regular-grey
    `,
  }[theme];

  return (
    <button
      id={`button-${id}`}
      data-testid={`button-${id}`}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        themeClasses,
        `
          box-border 
          h-11
          rounded-2xl
          text-body-s font-bold 
          flex items-center justify-center 
          disabled:cursor-not-allowed
          transition duration-100
          w-full
        `,
        { 'disabled:opacity-40': disabled }
      )}
    >
      {loading ? (
        <div className='flex justify-center items-center space-x-4'>
          <div className='animate-pulse'>{loadingMsg}</div>
          <div className='animate-spin w-4 h-4 border-2 border-r-[transparent] rounded-full' />
        </div>
      ) : (
        children
      )}

      {IconComponent && <IconComponent className='w-4 h-4 ml-4' />}
    </button>
  );
};

export default Button;