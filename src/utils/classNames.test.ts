import { cn, getComponentClasses, sizeClasses, variantClasses } from './classNames';

describe('classNames utilities', () => {
  describe('cn', () => {
    it('combines class names correctly', () => {
      expect(cn('base', 'additional')).toBe('base additional');
    });

    it('handles conditional classes', () => {
      const shouldShow = true;
      const shouldHide = false;
      expect(cn('base', shouldShow && 'conditional', shouldHide && 'hidden')).toBe('base conditional');
    });

    it('filters out falsy values', () => {
      expect(cn('base', null, undefined, '', 'valid')).toBe('base valid');
    });
  });

  describe('getComponentClasses', () => {
    it('generates basic component classes', () => {
      const result = getComponentClasses('base-class');
      expect(result).toContain('base-class');
    });

    it('applies variant classes correctly', () => {
      const result = getComponentClasses('base', 'primary');
      expect(result).toContain('bg-blue-600');
      expect(result).toContain('hover:bg-blue-700');
      expect(result).toContain('text-white');
    });

    it('applies size classes correctly', () => {
      const result = getComponentClasses('base', undefined, 'large');
      expect(result).toContain('h-12');
      expect(result).toContain('px-4');
      expect(result).toContain('text-base');
    });

    it('applies disabled state', () => {
      const result = getComponentClasses('base', undefined, undefined, true);
      expect(result).toContain('opacity-50');
      expect(result).toContain('cursor-not-allowed');
    });

    it('includes custom className', () => {
      const result = getComponentClasses('base', undefined, undefined, undefined, 'custom');
      expect(result).toContain('custom');
    });

    it('handles invalid variant gracefully', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = getComponentClasses('base', 'invalid' as unknown as any);
      expect(result).toContain('base');
      expect(result).not.toContain('bg-blue-600'); // Should not include invalid variant classes
    });

    it('handles invalid size gracefully', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = getComponentClasses('base', undefined, 'invalid' as unknown as any);
      expect(result).toContain('base');
      expect(result).not.toContain('h-12'); // Should not include invalid size classes
    });

    it('combines all options correctly', () => {
      const result = getComponentClasses('base', 'secondary', 'small', true, 'custom');
      expect(result).toContain('base');
      expect(result).toContain('bg-gray-600');
      expect(result).toContain('h-8');
      expect(result).toContain('opacity-50');
      expect(result).toContain('custom');
    });
  });

  describe('sizeClasses', () => {
    it('contains all expected size variants', () => {
      expect(sizeClasses.small).toBe('h-8 px-2 text-xs');
      expect(sizeClasses.medium).toBe('h-10 px-3 text-sm');
      expect(sizeClasses.large).toBe('h-12 px-4 text-base');
    });
  });

  describe('variantClasses', () => {
    it('contains all expected variant types', () => {
      expect(variantClasses.primary).toContain('bg-blue-600');
      expect(variantClasses.secondary).toContain('bg-gray-600');
      expect(variantClasses.success).toContain('bg-green-600');
      expect(variantClasses.warning).toContain('bg-yellow-600');
      expect(variantClasses.danger).toContain('bg-red-600');
    });

    it('includes hover states for all variants', () => {
      Object.values(variantClasses).forEach(className => {
        expect(className).toMatch(/hover:bg-\w+-700/);
      });
    });

    it('includes text color for all variants', () => {
      Object.values(variantClasses).forEach(className => {
        expect(className).toContain('text-white');
      });
    });
  });
});