import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory for the actual project
const targetDir = path.join(__dirname, 'src', 'core', 'data');

// Get all class directories
function getClassDirs() {
    try {
        return fs.readdirSync(targetDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    } catch (error) {
        console.error(`❌ Error reading target directory: ${targetDir}`);
        console.error(error.message);
        return [];
    }
}

function fixTripleNewlines() {
    console.log('🔄 REPLACING \\n\\n\\n WITH \\n\\n');
    console.log(`📁 Target directory: ${targetDir}`);
    console.log('Converting triple newlines to double newlines in all spec files\n');
    console.log('='.repeat(60));

    const classDirs = getClassDirs();
    if (classDirs.length === 0) {
        console.log('❌ No class directories found!');
        return;
    }

    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    let totalReplacements = 0;

    classDirs.forEach(className => {
        const classDir = path.join(targetDir, className);

        // Get all spec files (non-raw files)
        let specFiles;
        try {
            specFiles = fs.readdirSync(classDir)
                .filter(file => file.endsWith('.ts') && !file.startsWith('raw_'));
        } catch (error) {
            console.log(`❌ Error reading ${className} directory: ${error.message}`);
            errorCount++;
            return;
        }

        if (specFiles.length === 0) {
            return;
        }

        console.log(`\n${className.toUpperCase()}:`);

        specFiles.forEach(specFile => {
            const specName = specFile.replace('.ts', '');
            const specFilePath = path.join(classDir, specFile);

            try {
                // Read the existing TS file
                const originalContent = fs.readFileSync(specFilePath, 'utf8');
                
                // Check if it contains triple newlines
                const hasTripleNewlines = originalContent.includes('\\n\\n\\n');
                
                if (!hasTripleNewlines) {
                    console.log(`  ✅ ${specName}: No triple newlines found`);
                    skippedCount++;
                    return;
                }

                // Count replacements for this file
                const matches = originalContent.match(/\\n\\n\\n/g) || [];
                const fileReplacements = matches.length;
                
                // Replace \\n\\n\\n with \\n\\n
                const updatedContent = originalContent.replace(/\\n\\n\\n/g, '\\n\\n');

                // Write the updated file
                fs.writeFileSync(specFilePath, updatedContent);
                
                console.log(`  🔄 ${specName}: Replaced ${fileReplacements} triple newline(s)`);
                updatedCount++;
                totalReplacements += fileReplacements;

            } catch (error) {
                console.log(`  ❌ ${specName}: Error - ${error.message}`);
                errorCount++;
            }
        });
    });

    console.log('\n' + '='.repeat(60));
    console.log('📊 UPDATE SUMMARY:');
    console.log(`🔄 Files updated: ${updatedCount}`);
    console.log(`✅ Files with no triple newlines: ${skippedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total triple newlines replaced: ${totalReplacements}`);
    console.log('='.repeat(60));
    
    if (updatedCount > 0) {
        console.log('\n🚀 SUCCESS: Triple newlines replaced with double newlines!');
        console.log('💡 Text formatting should now be cleaner with proper paragraph spacing');
    }
}

// Execute the fix
fixTripleNewlines();
